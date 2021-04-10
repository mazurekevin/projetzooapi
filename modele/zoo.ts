export interface IZooProps{
    nom?: string,
    description: string,
    images: string,
    type: string,
    capacity: string,
    durée: number,
    horaires: number,
    accès_handicapé: boolean
}

export class Zoo implements IZooProps{
    nom?: string;
    description: string;
    images: string;
    type: string;
    capacity: string;
    durée: number;
    horaires: number;
    accès_handicapé: boolean;

    constructor(props: IZooProps){
        this.nom = props.nom
        this.description = props.description
        this.images = props.images
        this.type = props.type
        this.capacity = props.capacity
        this.durée = props.durée
        this.horaires = props.horaires
        this.accès_handicapé = props.accès_handicapé
    }
}