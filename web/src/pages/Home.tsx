import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { FileText, Book, HelpCircle, Plus } from 'lucide-react';
import { userAtom } from '../store/auth';

export default function Home() {
  const [user] = useAtom(userAtom);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to Summary AI{' '}
          <span className="text-blue-600">Assistant</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Transform your documents into concise summaries and generate insightful questions with the power of AI.
        </p>
        {!user ? (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/summaries/new"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Summary
            </Link>
          </div>
        )}
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex justify-center">
              <FileText className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Upload Documents</h2>
            <p className="mt-2 text-gray-600">
              Easily upload PDF and TXT files for instant summarization
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex justify-center">
              <Book className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Get Summaries</h2>
            <p className="mt-2 text-gray-600">
              Receive concise, accurate summaries of your documents
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex justify-center">
              <HelpCircle className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Generate Questions</h2>
            <p className="mt-2 text-gray-600">
              Create relevant questions from your summaries for better understanding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}