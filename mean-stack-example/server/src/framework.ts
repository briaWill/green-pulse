//set up framework interface. it should have all of the following fields
import * as mongodb from "mongodb";

export interface Framework {
    Framework_name: string;
    Framework_description: string;
    Assignee_email: string;
    Contributor_email1?: string;
    Contributor_email2?: string;
    _id?: mongodb.ObjectId;
    
}

// ? means optional field