import { HttpStatus } from "@/constants/http.status";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export const validateRequest = (schema: ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            req.validated = validated;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "validation error",
                    errors: error.issues,
                });
            }
            next(error);
        }
    };
};
