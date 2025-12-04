import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Start the Postgres World
  // Needed since we test this in CI
  if (process.env.WORKFLOW_TARGET_WORLD === '@workflow/world-postgres') {
    const { getWorld } = await import('workflow/runtime');
    console.log('Starting Postgres World...');
    await getWorld().start?.();
  }
}

bootstrap();
