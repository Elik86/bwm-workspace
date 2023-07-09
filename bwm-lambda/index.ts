import { S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as mysql from "mysql2/promise";

const s3 = new AWS.S3({ sslEnabled: false, s3ForcePathStyle: true });

export const lambdaHandler = async (event: S3Event): Promise<void> => {
  const logEntryPattern =
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(.*?)\] (.*)$/;

  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
  });

  try {
    // begin transaction
    await connection.beginTransaction();

    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    const params = {
      Bucket: bucket,
      Key: key,
    };

    const s3Object = await s3.getObject(params).promise();

    const fileContent = s3Object.Body?.toString("utf-8");

    if (fileContent) {
      // split the file contents into lines
      const lines = fileContent.split(/\r?\n/);

      for (const line of lines) {
        // first and last line are empty
        if (line !== "") {
          const [, timestamp, severity, message] =
            line.match(logEntryPattern) || [];

          const query =
            "INSERT INTO bwm.log (timestamp, severity, message) VALUES (?, ?, ?)";

          const values = [timestamp, severity, message];
          await connection.execute(query, values);
        }
      }

      // commit the transaction
      await connection.commit();
    }
  } catch (err: any) {
    // there is a failure, rollback!
    connection.rollback();
    console.log("the error is: ", err["message"]);
  } finally {
    await connection.end();
  }
};
