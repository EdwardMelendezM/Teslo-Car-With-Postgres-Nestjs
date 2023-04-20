/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from ".";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'product_images'})
export class ProductImage{
  @ApiProperty({
    example: ['635498735216854'],
    description: 'Id NUMBER',
  })
  @PrimaryGeneratedColumn()
  id:number;


  @ApiProperty({
    example: 'http://localhost:3000/api/file',
    description: 'Image route',
  })
  @Column('text')
  url:string;

  @ManyToOne(
    ()=>Product,
    (product)=>product.images,
    {onDelete:'CASCADE'}
  )
  product:Product
}