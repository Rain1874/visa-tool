import request from '@/utils/http';

export async function testMockApi() {
  return request('/api/user_api/v1/user/profile_id', {
    method: 'GET',
    data: {},
  });
}
