
export interface Booking {
    
    flugId: number;
    passagierId: number;
    buchungsStatus: number;
    flug: Flight; 
    
    isDirty: boolean;
    
}

export interface Flight {
    id: number;
    abflugsort: string;
    zielort: string;
    datum: string;
}