/**
 * Example API Service Template
 *
 * This file demonstrates best practices for creating API services using Axios.
 * Copy this template when creating new API services.
 */

import axiosInstance from '@/lib/axios'

// Define your types
interface ExampleEntity {
  id: number
  name: string
  description: string
}

interface CreateExampleDTO {
  name: string
  description: string
}

interface UpdateExampleDTO {
  name?: string
  description?: string
}

/**
 * GET - Fetch all entities
 */
export const getExamples = async (): Promise<ExampleEntity[]> => {
  const response = await axiosInstance.get<ExampleEntity[]>('/examples')
  return response.data
}

/**
 * GET - Fetch single entity by ID
 */
export const getExampleById = async (id: number): Promise<ExampleEntity> => {
  const response = await axiosInstance.get<ExampleEntity>(`/examples/${id}`)
  return response.data
}

/**
 * GET - Fetch with query parameters
 */
export const getExamplesWithFilters = async (params: {
  page?: number
  limit?: number
  search?: string
}): Promise<ExampleEntity[]> => {
  const response = await axiosInstance.get<ExampleEntity[]>('/examples', {
    params,
  })
  return response.data
}

/**
 * POST - Create new entity
 */
export const createExample = async (
  data: CreateExampleDTO
): Promise<ExampleEntity> => {
  const response = await axiosInstance.post<ExampleEntity>('/examples', data)
  return response.data
}

/**
 * PUT - Replace entire entity
 */
export const replaceExample = async (
  id: number,
  data: CreateExampleDTO
): Promise<ExampleEntity> => {
  const response = await axiosInstance.put<ExampleEntity>(
    `/examples/${id}`,
    data
  )
  return response.data
}

/**
 * PATCH - Partial update
 */
export const updateExample = async (
  id: number,
  data: UpdateExampleDTO
): Promise<ExampleEntity> => {
  const response = await axiosInstance.patch<ExampleEntity>(
    `/examples/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE - Remove entity
 */
export const deleteExample = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/examples/${id}`)
}

/**
 * POST - Upload file with FormData
 */
export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axiosInstance.post<{ url: string }>(
    '/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

/**
 * GET - Download file
 */
export const downloadFile = async (id: number): Promise<Blob> => {
  const response = await axiosInstance.get(`/files/${id}`, {
    responseType: 'blob',
  })
  return response.data
}

/**
 * POST - Request with custom timeout
 */
export const slowRequest = async (): Promise<ExampleEntity> => {
  const response = await axiosInstance.post<ExampleEntity>(
    '/slow-endpoint',
    {},
    {
      timeout: 30000, // 30 seconds
    }
  )
  return response.data
}

/**
 * GET - Request with custom headers
 */
export const getWithCustomHeaders = async (): Promise<ExampleEntity[]> => {
  const response = await axiosInstance.get<ExampleEntity[]>('/examples', {
    headers: {
      'X-Custom-Header': 'custom-value',
      'X-API-Version': 'v2',
    },
  })
  return response.data
}

/**
 * POST - Request with AbortController (cancellable)
 */
export const getCancellableRequest = async (
  signal?: AbortSignal
): Promise<ExampleEntity[]> => {
  const response = await axiosInstance.get<ExampleEntity[]>('/examples', {
    signal,
  })
  return response.data
}

// Usage example for cancellable request:
// const controller = new AbortController();
// getCancellableRequest(controller.signal);
// controller.abort(); // Cancel the request
