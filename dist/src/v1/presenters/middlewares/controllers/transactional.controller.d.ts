import { Request, Response, NextFunction } from 'express';
import { DataSource, QueryRunner } from 'typeorm';
export declare const makeTransactionalController: (dbDataSource: DataSource) => (fn: (tx: QueryRunner) => (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const transactionalController: (fn: (tx: QueryRunner) => (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
