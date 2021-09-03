import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { LeadCreatedEvent } from '../events/lead-created';
import { GetSubscriptionQuery } from '../queries/get-subscription';
import { LeadRepository } from '../repositories/lead.repository';

export class CreateLeadCommand {
  constructor(public readonly email: string) {}
}

@CommandHandler(CreateLeadCommand)
export class CreateLeadHandler implements ICommandHandler<CreateLeadCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly leadRepository: LeadRepository,
  ) {}

  async execute(command: CreateLeadCommand) {
    console.log({ command });
    const { email } = command;

    const hasSubscription = await this.queryBus.execute(
      new GetSubscriptionQuery({ email }),
    );

    if (!!hasSubscription) {
      // do anything
    }

    const lead = await this.leadRepository.create(email);

    this.eventBus.publish(new LeadCreatedEvent(lead));
    return lead;
  }
}
