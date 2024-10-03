import { Module } from '@nestjs/common';//s83 creamos este modulo en el CLI - consola - vainas comunes en toda mi app
import { AxiosAdapter } from './httpadapters/axios.adapter';

@Module({
    providers:[AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
