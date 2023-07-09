import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export const Severity = {
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
} as const;

@Entity()
export class Log {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Index()
  @Column()
  timestamp: Date;

  @Index()
  @Column({ type: "enum", enum: Severity, default: Severity.INFO })
  severity: typeof Severity;

  @Column()
  message: string;
}
