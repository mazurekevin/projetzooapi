import {Connection, ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {IZooProps, Zoo} from "../modele/zoo";

export interface ZooOptions{
    nom: string,
    description?: string,
    images?: string,
    type?: string,
    capacity?: string,
    durée?: number,
    horaires?: number,
    accès_handicapé?: boolean
}


export class ZooControllers {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }


    async getByNom(nom: string): Promise<Zoo | null> {
        const res = await this.connection.query(`SELECT nom, description, image,type,capacité,durée,horaires,accès_handicapé FROM Zoo WHERE nom = ${escape(nom)}`)
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[]
            if (rows.length > 0) {
                const row = rows[0]
                return new Zoo({
                    nom: row["nom"],
                    description: row["description"],
                    images: row["images"],
                    type: row["type"],
                    capacity: row["capacité"],
                    durée: row["durée"],
                    horaires: row["horaires"],
                    accès_handicapé: row["accès_handicapé"]
                })
            }
        }
        return null;
    }


    async removeById(nom: string): Promise<boolean> {
        try {
            const res = await this.connection.execute(`DELETE FROM Zoo WHERE id = ${escape(nom)}`)
            const headers = res[0] as ResultSetHeader
            return headers.affectedRows === 1

        } catch (err) {
            console.error(err)
            return false
        }

    }

    async update(options: ZooOptions): Promise<Zoo | null> {
        const setClause: string[] = []
        const params = []
        if (options.nom !== undefined) {
            setClause.push("nom = ?")
            params.push(options.nom)
        }
        if (options.description !== undefined) {
            setClause.push("description = ?")
            params.push(options.description)
        }
        if (options.images !== undefined) {
            setClause.push("images = ?")
            params.push(options.images)
        }
        if (options.type !== undefined) {
            setClause.push("type = ?")
            params.push(options.type)
        }
        if (options.capacity !== undefined) {
            setClause.push("capacité = ?")
            params.push(options.capacity)
        }
        if (options.durée !== undefined) {
            setClause.push("durée = ?")
            params.push(options.durée)
        }
        if (options.horaires !== undefined) {
            setClause.push("horaires = ?")
            params.push(options.horaires)
        }
        if (options.accès_handicapé !== undefined) {
            setClause.push("accès_handicapé = ?")
            params.push(options.accès_handicapé)
        }
        const res = await this.connection.execute(`UPDATE Zoo SET ${setClause.join(", ")} WHERE nom = ?`, params)
        const headers = res[0] as ResultSetHeader
        if (headers.affectedRows === 1) {
            return this.getByNom(options.nom)
        }
        return null;
    }

    async create(zoo: IZooProps): Promise<Zoo | null> {
        try {
            const res = await this.connection.execute("INSERT INTO (nom,description,images,type,capacité,durée,horaires,accès_handicapé) VALUES (?,?,?,?,?,?,?)", [
                zoo.nom,
                zoo.description,
                zoo.images,
                zoo.type,
                zoo.capacity,
                zoo.durée,
                zoo.horaires,
                zoo.accès_handicapé
            ])
            const headers = res[0] as ResultSetHeader
            return new Zoo({
                nom : "" +headers.insertId,
                ...zoo
            })
        } catch (err) {
            console.error(err)
            return null
        }
    }
}