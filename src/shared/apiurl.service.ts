import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrl {

    constructor() { }

    private baseUrl: string = "http://localhost:14151";
    public loginUrl: string = this.baseUrl + "/api/login";
    public signupUrl: string = this.baseUrl + "/api/register";
    public dashboardStatsUrl: string = this.baseUrl + "/api/dashboardStats";
    public report: string = this.baseUrl + "/api/dashboard";
    public addOnlyExpense = this.baseUrl + "/api/addOnlyExpense";
    public addExpense = this.baseUrl + "/api/addExpense";
    public updateOnlyExpense = this.baseUrl + "/api/updateOnlyExpense";
    public updateExpense = this.baseUrl + "/api/updateExpense";
    public deleteExpense = this.baseUrl + "/api/Expense";

    public getAllExpenses = this.baseUrl + "/api/expense";
    public getAllExpensesByCategory = this.baseUrl + "/api/getAllExpensesByCategory";
    public getAllExpensesByDate = this.baseUrl + "/api/getAllExpensesByDate";
    public getAllExpensesBySubCategory = this.baseUrl + "/api/getAllExpensesBySubCategory";
    public expenseCategory = this.baseUrl + "/api/expenseCategory";
    public expenseStorySummary = this.baseUrl + "/api/expenseStorySummary";
    public addExpenseStory = this.baseUrl + "/api/addExpenseStory";
    public deleteExpenseStory = this.baseUrl + "/api/deleteExpenseStory";
    public editExpenseStory = this.baseUrl + "/api/editExpenseStory";

    public pubnubSubscribeKey = this.baseUrl + "/api/pubnub/subscribekey";
    public getAllActiveExpenseStories = this.baseUrl + "/api/getAllActiveExpenseStories";

    public getNotifications = this.baseUrl + "/api/notifications";
    public profilePicUrl = this.baseUrl + "/api/profilePic";

    public updatePassword = this.baseUrl + "/api/updatePassword";
    public profile = this.baseUrl + "/api/profile";
    public updateUser = this.baseUrl + "/api/updateUser";
    public friends = this.baseUrl + "/api/user/friends";
    public inviteFriend = this.baseUrl + "/api/user/friend/invite";
    public newConnections = this.baseUrl + "/api/user/newConnections";
    public myFriendInvitations = this.baseUrl + "/api/user/friendinvitations";
    public acceptFriendInvitation = this.baseUrl + "/api/friend/acceptFriendInvitation";
    public declineFriendInvitation = this.baseUrl + "/api/friend/declineFriendInvitation";

    public addCollaborator = this.baseUrl + "/api/expenseStory/addCollaborator";
    public getAllCollaborators = this.baseUrl + "/api/expenseStory/getAllCollaborators";
    public downloadReceipt = this.baseUrl + "/api/downloadReceipt";

    public register = this.baseUrl + "/api/register";
    public getFriendsWhoAreNotCollaborators = this.baseUrl + "/api/collaborator/newCollaborators";
    public forgotPassword = this.baseUrl + "/api/user/forgotPassword";
}