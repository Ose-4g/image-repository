export interface PaginatedResult<T> {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  data: T[];
}
