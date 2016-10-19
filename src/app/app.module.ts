import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {Storage} from '@ionic/storage';
//import {MomentModule} from 'angular2-moment';

import {DollarTrackerApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {SettingPage} from '../pages/setting/setting';

import {NotificationsPage} from '../pages/notifications/notifications';
import {NotificationsService} from '../pages/notifications/notifications.service';

import {LoginPage} from '../pages/login/login';
import {LoginService} from  '../pages/login/login.service';

import {HomePage} from '../pages/home/home';

import {FriendsPage} from '../pages/friends/friends';
import {FriendsService} from '../pages/friends/friends.service';
import {InviteFriendPage} from '../pages/friends/invite-friend';
import {InviteFriendModalPage} from '../pages/friends/invite-friend.modal';

import {ExpenseStoryService} from '../pages/expenseStory/expenseStory.service';
import {ExpenseStoryDetailsPage} from '../pages/expenseStory/expenseStoryDetails';
import {ImageViewerModalPage} from '../pages/expenseStory/image-viewer-modal';

import {ExpenseReportPage} from '../pages/expenseReport/expenseReport';
import {NewExpenseReportModalPage} from '../pages/expenseReport/newExpenseReport.modal';

import {ExpensePage} from '../pages/expense/expense';
import {ExpenseModalPage} from '../pages/expense/expense.modal';
import {ExpenseService} from '../pages/expense/expense.service';

import {DashboardPage} from '../pages/dashboard/dashboard';
import {DashboardService} from '../pages/dashboard/dashboard.service';

import {CollaboratorModalPage} from '../pages/collaborator/collaborator.modal';
import {CollaboratorService} from '../pages/collaborator/collaborator.service';

import {UserService} from '../user/user.service';
import {ApiUrl} from '../shared/apiurl.service';
import {ApiService} from '../shared/api/api.service';
import {JwtService} from '../shared/jwt/jwt.service';
import {IconMapperService} from '../shared/iconmapper/iconmapper.service';
import {UploadService} from '../shared/upload/upload.service';
import {Plugins} from '../shared/upload/plugins.service';

import {IonicSelectPage} from '../shared/ionic-select/ionic-select';
import {IonicSearchSelectPage} from '../shared/ionic-select/ionic-search-select';
import {TouchIdService} from '../shared/touch-id/touch-id.service';

import {AccountPage} from '../pages/account/account';
import {PubnubService} from '../pages/notifications/pubnub.service';
import {SplitPascalWordPipe} from '../shared/split-word/split-pascal-word.pipe';
import {ForgotPasswordPage} from '../pages/forgotPassword/forgotPassword';

const DT_COMPONENTS = [
    TabsPage,
    SettingPage,
    NotificationsPage,
    LoginPage,
    HomePage,
    FriendsPage,
    InviteFriendPage,
    InviteFriendModalPage,
    ExpenseStoryDetailsPage,
    ImageViewerModalPage,
    ExpensePage,
    ExpenseModalPage,
    DashboardPage,
    CollaboratorModalPage,
    IonicSearchSelectPage,
    IonicSelectPage,
    ExpenseReportPage,
    AccountPage,
    NewExpenseReportModalPage,
    ForgotPasswordPage
]

const DT_SERVICES = [
    NotificationsService,
    LoginService,
    FriendsService,
    ExpenseStoryService,
    ExpenseService,
    DashboardService,
    CollaboratorService,
    UserService,
    ApiUrl,
    ApiService,
    JwtService,
    IconMapperService,
    UploadService,
    Plugins,
    TouchIdService,
    PubnubService
]

@NgModule({
    declarations: [
        DollarTrackerApp,
        DT_COMPONENTS,
        SplitPascalWordPipe
    ],
    imports: [
   //     MomentModule,
        IonicModule.forRoot(DollarTrackerApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [DollarTrackerApp, DT_COMPONENTS],
    providers: [DT_SERVICES, Storage]
})
export class AppModule { }