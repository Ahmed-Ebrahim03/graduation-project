import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FileText, HelpCircle } from 'lucide-react';
import api from '../lib/axios';
import { Summary } from '../types';

export default function SummaryDetail() {
  const { id } = useParams<{ id: string }>();
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<string[]>([]);

  const { data: summary, isLoading, error } = useQuery<Summary>({
    queryKey: ['summary', id],
    queryFn: async () => {
      const response = await api.get(`/summarize/${id}`);
      console.log(response.data);
      return response.data.summary;
    },
  });

  const generateQuestionsMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/questions', {
        summaryId: id,
        number: questionCount,
      });
      console.log(response.data);
      return response.data.questions;
    },
    onSuccess: (data) => {
      setQuestions(data.questions);
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading summary...</div>;
  }

  if (error || !summary) {
    return <div className="text-center text-red-600">Error loading summary</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FileText className="h-6 w-6 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold">{summary.title}</h1>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{summary.summary}</p>
        <div className="mt-4 text-sm text-gray-500">
          Created on {new Date(summary.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Generate Questions</h2>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="number"
            min="1"
            max="10"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => generateQuestionsMutation.mutate()}
            disabled={generateQuestionsMutation.isPending}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {generateQuestionsMutation.isPending ? 'Generating...' : 'Generate Questions'}
          </button>
        </div>
        {questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">
                  {index + 1}. {question}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}