import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
  id: number
  name: string
  username?: string
  email: string
}

type CreateUserBody = Pick<User, 'name' | 'email'> & Partial<Pick<User, 'username'>>
type UpdateUserBody = Pick<User, 'id' | 'name' | 'email'> & Partial<Pick<User, 'username'>>

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map((u) => ({ type: 'Users' as const, id: u.id })),
              { type: 'Users' as const, id: 'LIST' },
            ]
          : [{ type: 'Users' as const, id: 'LIST' }],
    }),
    createUser: build.mutation<User, CreateUserBody>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        let tempId = -1
        const patch = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const maxId = draft.reduce((m, u) => Math.max(m, u.id), 0)
            tempId = maxId + 1
            draft.unshift({
              id: tempId,
              name: body.name,
              email: body.email,
              username: body.username,
            })
          }),
        )

        try {
          const { data } = await queryFulfilled
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              const idx = draft.findIndex((u) => u.id === tempId)
              if (idx >= 0) {
                draft[idx] = { ...draft[idx], ...data, id: draft[idx].id }
              }
            }),
          )
        } catch {
          patch.undo()
        }
      },
      invalidatesTags: [],
    }),
    updateUser: build.mutation<User, UpdateUserBody>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted({ id, ...patchBody }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const u = draft.find((x) => x.id === id)
            if (u) Object.assign(u, patchBody)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
      invalidatesTags: [],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi

