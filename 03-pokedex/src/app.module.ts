import { join } from 'path';//importado - de node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';//importado


@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    })],

})
export class AppModule {}
