import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Start the Postgres World
  // Needed since we test this in CI
  if (process.env.NEXT_RUNTIME !== 'edge') {
    // kickstart the world
    import('workflow/runtime').then(async ({ getWorld }) => {
      await getWorld().start?.();
    });
  }
}

bootstrap();
