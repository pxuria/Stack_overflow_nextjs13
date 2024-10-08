"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, path, question } = params;
    const newAnswer = await Answer.create({ content, author, question });

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { path, answerId, userId, hasdownVoted, hasupVoted } = params;
    let updateQuery = {};

    if (hasupVoted) updateQuery = { $pull: { upvotes: userId } };
    else if (hasdownVoted)
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    else updateQuery = { $addToSet: { upvotes: userId } };

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found!");

    // Increment Author's reputation
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { path, answerId, userId, hasdownVoted, hasupVoted } = params;
    let updateQuery = {};

    if (hasdownVoted) updateQuery = { $pull: { downvotes: userId } };
    else if (hasupVoted)
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    else updateQuery = { $addToSet: { downvotes: userId } };

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found!");

    // Increment Author's reputation
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
