import * as Faker from "faker"
import {define} from "typeorm-seeding"
import {Question} from "../Models/Question";

define(Question, (faker: typeof Faker, context: { type : string }) => {

    const question = new Question()
    question.type = '';
    question.value = faker.lorem.words(4);

    return question;
})