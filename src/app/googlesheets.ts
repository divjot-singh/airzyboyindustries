'use server'

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';



const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
(process.env.GOOGLE_SERVICE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');
const NEXT_PRIVATE_PASSWORD=process.env.NEXT_PRIVATE_PASSWORD

export async function storeData (arrayToStore: string[], password: string): Promise<boolean> {
    try{
        if(password == NEXT_PRIVATE_PASSWORD){
            const auth = new JWT({
                email: GOOGLE_CLIENT_EMAIL,
                key: GOOGLE_SERVICE_PRIVATE_KEY,
                scopes: [
                    'https://www.googleapis.com/auth/spreadsheets',
                ],
            });
            
            
            const doc = new GoogleSpreadsheet(SPREADSHEET_ID ?? '', auth);
            await doc.loadInfo();
            await doc.sheetsByIndex[0].addRow(arrayToStore);
            return true;
        } else{
            return false;
        }
    } catch(e){
        console.log(e);
        return false;
    }
}