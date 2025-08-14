import { defineConfig } from 'orval'
// import axios from 'axios'
// import baseConfig from '../../../../libs/links'
import { resolve } from 'path'

const workspaceRoot = resolve(__dirname, '../../../../')
export default defineConfig(() => {
  return {
    ecom: {
      output: {
        mode: 'tags',
        target: resolve(workspaceRoot, './modules/api/endpoints'),
        schemas: resolve(workspaceRoot, './modules/api/models'),
        client: 'react-query',
        prettier: true,
        override: {
          query: {
            useQuery: true,
            useSuspenseQuery: true,
            usePrefetch: true
            // useInfinite: true,
            // useInfiniteQueryParam: 'page'
          },
          // operations: {
          //   useApiNotifications: {
          //     query: {
          //       useInfiniteQueryParam: 'page'
          //     }
          //   }
          // },
          mutator: {
            path: resolve(workspaceRoot, './modules/api/config/custom-instance.ts'),
            name: 'mainInstance'
          }
        }
      },
      input: {
        target: './swagger_output.json'
      }
    }
  }
}) as unknown
