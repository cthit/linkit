import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryColumn()
    shortcut: string;
    @Column()
    linkurl: string;
    @Column()
    creatorUID: string;
    @Column({
        default: 0,
    })
    timesAccessed: number;
}
