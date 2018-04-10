import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/Storage';
import { NativeStorage } from '@ionic-native/native-storage';
import {MomentModule} from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TouchID } from '@ionic-native/touch-id';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
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
import {InviteFriendModalPage} from '../pages/friends/invite-friend.modal';

import {ExpenseStoryService} from '../pages/expenseStory/expenseStory.service';
import {ExpenseStoryDetailsPage} from '../pages/expenseStory/expenseStoryDetails';
import {ImageViewerModalPage} from '../pages/expenseStory/image-viewer-modal';

import {ExpenseReportPage} from '../pages/expenseReport/expenseReport';
import {NewExpenseReportModalPage} from '../pages/expenseReport/newExpenseReport.modal';
import {ExpenseReportItem} from '../pages/expenseReport/expense-report-item';

import {ExpensePage} from '../pages/expense/expense';
import {ExpenseModalPage} from '../pages/expense/expense.modal';
import {ExpenseService} from '../pages/expense/expense.service';

import {DashboardPage} from '../pages/dashboard/dashboard';
import {DashboardService} from '../pages/dashboard/dashboard.service';
import {DashboardStats} from '../pages/dashboard/dashboard-stats/dashboard-stats';
import {DashboardStatsItem} from '../pages/dashboard/dashboard-stats-item/dashboard-stats-item';
import {DashboardStatsItemIcon} from '../pages/dashboard/dashboard-stats-item/dashboard-stats-item-icon';
import {DashboardStatsItemText} from '../pages/dashboard/dashboard-stats-item/dashboard-stats-item-text';


import {CollaboratorModalPage} from '../pages/collaborator/collaborator.modal';
import {CollaboratorService} from '../pages/collaborator/collaborator.service';

import {UserService} from '../user/user.service';
import {ApiUrl} from '../shared/apiurl.service';
import {ApiService} from '../shared/api/api.service';
import {JwtService} from '../shared/jwt/jwt.service';
import {IconMapperService} from '../shared/iconmapper/iconmapper.service';
import {UploadService} from '../shared/upload/upload.service';
import {Plugins} from '../shared/upload/plugins.service';
import {ProgressBarCircleComponent} from '../shared/progress-bar/progress-bar-circle.component' 

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
    InviteFriendModalPage,
    ExpenseStoryDetailsPage,
    ImageViewerModalPage,
    ExpensePage,
    ExpenseModalPage,
    DashboardPage,
    DashboardStats,
    DashboardStatsItem,
    DashboardStatsItemIcon,
    DashboardStatsItemText,
    CollaboratorModalPage,
    IonicSearchSelectPage,
    IonicSelectPage,
    ExpenseReportPage,
    ExpenseReportItem,
    AccountPage,
    NewExpenseReportModalPage,
    ForgotPasswordPage,
    ProgressBarCircleComponent
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
const IONIC_PROVIDERS = [
    StatusBar, TouchID, NativeStorage, Camera, SplashScreen
]

@NgModule({
    declarations: [
        DollarTrackerApp,
        DT_COMPONENTS,
        SplitPascalWordPipe
    ],
    imports: [
        MomentModule,
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(DollarTrackerApp),
        IonicStorageModule.forRoot({
            name: '__yourappname',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
          })
    ],
    bootstrap: [IonicApp],
    entryComponents: [DollarTrackerApp, DT_COMPONENTS],
    providers: [DT_SERVICES, {provide: ErrorHandler, useClass: IonicErrorHandler}, IONIC_PROVIDERS]
})
export class AppModule { }