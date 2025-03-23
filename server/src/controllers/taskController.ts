import {Response, Request} from "express";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
    const {projectId} = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            }
        });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({message: `Error while getting tasks: ${error.message}`});
    }
}


export const createTask = async (req: Request, res: Response) => {
    const {
        title,
        description,
        status,
        priority,
        tags,
        points,
        projectId,
        authorUserId,
        assignedUserId,
        startDate,
        dueDate
    } = req.body;
    try {
        const newTask = await prisma.task.create(
            {
                data: {
                    title,
                    description,
                    status,
                    priority,
                    tags,
                    points,
                    projectId,
                    authorUserId,
                    assignedUserId,
                    startDate,
                    dueDate
                }
            }
        );
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({message: `Error creating project: ${error.message}`});
    }
}