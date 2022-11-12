import { Request, Response } from "express";

export default function (_req: Request, res: Response): Response {
  return res.status(500).json({
    error: "Error 500: Internal server error.",
  });
}
