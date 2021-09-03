import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubscriptionRepository } from '../repositories/subscription.repository';

export class GetSubscriptionQuery {
  constructor(public params: { email: string }) {}
}

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  implements IQueryHandler<GetSubscriptionQuery>
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  public async execute(query: GetSubscriptionQuery) {
    console.log({ query });
    const { email } = query.params;
    return this.subscriptionRepository.findByEmail(email);
  }
}
