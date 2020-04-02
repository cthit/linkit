import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryColumn()
    shortcut: string;
    @Column()
    linkurl: string;
    @Column()
    creatorUID: string;
}
