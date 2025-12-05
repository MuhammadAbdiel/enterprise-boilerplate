import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getArticles } from '../services/api'

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
}
