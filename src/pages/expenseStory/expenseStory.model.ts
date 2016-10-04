export class ExpenseStory {
    expenseStoryId:string;
    expenseStoryTypeId:string;
    title:string;
    budget:any;
    income:any;
    createdBy:string;
    startDt:string;
    endDt:string;
    createdUtcDt:string;
}

export class ExpensesStat
{
    label:string;
    value:any;
}

export class ExpenseStorySummary{
    totalExpenseCount:number;
    expenseStory:ExpenseStory;
    expensesStats:ExpensesStat;
    totalExpenses:any
}