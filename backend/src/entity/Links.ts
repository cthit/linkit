import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryColumn()
    shortcut: String;
    @Column()
    linkurl: String;
    @Column()
    creatorUID: String;
}
