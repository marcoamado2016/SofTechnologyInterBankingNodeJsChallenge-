import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { HTTP_CODES } from "../../dominio/enum/http.codes";
export const middleware = (req: any, res: any, next: any) => {
    let SECRET_KEY = process.env.SECRET_KEY;
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ error: "Formato de token inválido" });
    }
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: "no hay token" });
    try {
        const decoded = jwt.verify(token, SECRET_KEY as string);
        (req as any).user = decoded;
        return next();
    } catch (error) {
        return res.status(HTTP_CODES.FORBIDDEN).json({ error: "Token inválido o expirado" });

    }

}