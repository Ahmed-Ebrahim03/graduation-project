import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Plus } from "lucide-react";
import api from "../lib/axios";
import { Summary } from "../types";

export default function Summaries() {
  const {
    data: summaries,
    isLoading,
    error,
  } = useQuery<Summary[]>({
    queryKey: ["summaries"],
    queryFn: async () => {
      const response = await api.get("/summarize");
      console.log(response.data); // Debug response structure
      return response.data.summarizes;
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading summaries...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Error loading summaries</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Summaries</h1>
        <Link
          to="/summaries/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Summary
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {summaries?.map((summary) => (
          <Link
            key={summary._id}
            to={`/summaries/${summary._id}`}
            className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">{summary.title}</h2>
            </div>
            <p className="text-gray-600 line-clamp-3">{summary.summary}</p>
            <div className="mt-4 text-sm text-gray-500">
              {new Date(summary?.createdAt).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
