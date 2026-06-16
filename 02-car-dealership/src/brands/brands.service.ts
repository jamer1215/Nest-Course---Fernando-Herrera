import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
//creemos este atributo
  private brands:Brand[]= [
    {
      id:uuid(),
      name:'Toyota',
  
      createdAt:new Date().getTime(),
      
    }

  ]
  

  create(createBrandDto: CreateBrandDto) {
   const { name } = createBrandDto;//desestructuro
   
    const brand: Brand={
      id:uuid(),
      name:name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
      //updatedAt: new Date().getTime()

    }

    this.brands.push(brand);

    return this.brands;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand=>brand.id===id);

    if(!brand) throw new NotFoundException(`Brand with id "${ id }" not encontradou`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB =this.findOne(id);

    this.brands = this.brands.map(brand =>{
      if(brand.id===id){
        brandDB.updatedAt = new Date().getTime();
        brandDB = {...brandDB,...updateBrandDto}
        return brandDB;
      }
      return brand;
    })
    return brandDB;
  }


  remove(id: string) {
    this.brands = this.brands.filter(brand=> brand.id !== id);
  }

    //sesion 62
    fillBrandsWithSeedData(brands:Brand[]){

      this.brands=brands;//esto en realidad lo inserto de una en una BD
  
    }
}
