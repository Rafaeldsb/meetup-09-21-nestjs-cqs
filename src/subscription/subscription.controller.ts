import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLeadCommand } from './commands/create-lead';
import { PaySubscriptionCommand } from './commands/pay-subscription';
import { GetSubscriptionQuery } from './queries/get-subscription';

@Controller()
export class SubscriptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/lead')
  lead() {
    console.log('POST /lead');
    return this.commandBus.execute(new CreateLeadCommand('teste@online.com'));
  }

  @Post('/subscription')
  subscription() {
    console.log('POST /subscription');
    return this.commandBus.execute(
      new PaySubscriptionCommand('teste@online.com'),
    );
  }

  @Get('/subscription')
  getSubscription() {
    console.log('GET /subscription');
    return this.queryBus.execute(
      new GetSubscriptionQuery({ email: 'aloha@test.com' }),
    );
  }
}
