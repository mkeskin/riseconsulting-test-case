export default function handler(request, response) {
  var content = [
    {
      key: '3-urgent',
      name: 'Urgent',
    },
    {
      key: '2-regular',
      name: 'Regular',
    },
    {
      key: '1-trivial',
      name: 'Trivial',
    },
  ]

  response.status(200).json({
    body: content,
    query: request.query,
    cookies: request.cookies,
  })
}
