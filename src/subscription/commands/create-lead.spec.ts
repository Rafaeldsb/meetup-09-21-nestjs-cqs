import { EventBus, QueryBus } from '@nestjs/cqrs';
import { Lead } from '../models/lead';
import { LeadRepository } from '../repositories/lead.repository';
import { CreateLeadCommand, CreateLeadHandler } from './create-lead';

describe('CreateLeadCommand', () => {
  let handler: CreateLeadHandler;
  let queryBus: QueryBus;
  let eventBus: EventBus;
  let leadRepository: LeadRepository;

  beforeEach(() => {
    queryBus = jest.fn().mockImplementation(() => ({
      execute: jest.fn(),
    }))();
    eventBus = jest.fn().mockImplementation(() => ({
      publish: jest.fn(),
    }))();
    leadRepository = jest.fn().mockImplementation(() => ({
      create: jest.fn(),
    }))();
    handler = new CreateLeadHandler(queryBus, eventBus, leadRepository);
  });

  it('should create a lead when dont has subscription', async () => {
    const command: CreateLeadCommand = new CreateLeadCommand('teste@teste.com');
    const lead = new Lead('1', command.email);
    jest.spyOn(queryBus, 'execute').mockResolvedValue(null);
    jest.spyOn(leadRepository, 'create').mockResolvedValue(lead);

    await handler.execute(command);

    expect(leadRepository.create).toBeCalledWith(command.email);
  });
});
