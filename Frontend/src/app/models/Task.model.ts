export class ParentTask {
    _id?: string;
    parentTask: string;
    projectId: string;
}

export class Task{
    _id?:string
    userId: string;
    projectId: string;
    parentTaskId: string;
    task: string;
    priority: number;
    startDate: string;
    endDate: string
}