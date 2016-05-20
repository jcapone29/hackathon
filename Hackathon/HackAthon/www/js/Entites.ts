module Genscape.Mobile {

    export class UserInfo {

        UserId: number;
        UserName: string;
        lastName: string;
        Email: string;
        title: string;
        phone: string;
        Password: string;


    }

    export class Topic {

        AgendaId: number;
        AgendaItemTypeId: number;
        AgendaTypeName: string;
        Description: string;
        EndTime: Date;
        Name: string;
        ResponsibleUserId: number;
        StartTime: Date;
        Current: boolean;
        Active: boolean;
        ResponsiblePersonName: string;
        RatingRate: number;
        RatingMax: number;
    }

    export interface Rating {
        topic: Topic;
        rating: Number;
    }
}
