import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowModule } from 'workflow/nest';

@Module({
  imports: [WorkflowModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
