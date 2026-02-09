import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/portfolio';

async function testAPI() {
  console.log('🧪 Testing Portfolio API...\n');

  try {
    // Test profile endpoint
    console.log('📋 Testing /profile endpoint...');
    const profileRes = await axios.get(`${API_BASE_URL}/profile`);
    console.log('✅ Profile data:', profileRes.data);

    // Test skills endpoint
    console.log('\n💻 Testing /skills endpoint...');
    const skillsRes = await axios.get(`${API_BASE_URL}/skills`);
    console.log('✅ Skills data:', skillsRes.data.length, 'skills found');

    // Test projects endpoint
    console.log('\n🚀 Testing /projects endpoint...');
    const projectsRes = await axios.get(`${API_BASE_URL}/projects`);
    console.log('✅ Projects data:', projectsRes.data.length, 'projects found');

    // Test blogs endpoint
    console.log('\n📚 Testing /blogs endpoint...');
    const blogsRes = await axios.get(`${API_BASE_URL}/blogs`);
    console.log('✅ Blogs data:', blogsRes.data.length, 'blogs found');

    // Test resume endpoint
    console.log('\n📄 Testing /resume endpoint...');
    const resumeRes = await axios.get(`${API_BASE_URL}/resume`);
    console.log('✅ Resume data received, length:', resumeRes.data.latex.length, 'characters');

    // Test contact endpoint
    console.log('\n📧 Testing /contact endpoint...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the API test script.'
    };
    const contactRes = await axios.post(`${API_BASE_URL}/contact`, contactData);
    console.log('✅ Contact form submission:', contactRes.data);

    console.log('\n🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAPI();
}

export { testAPI };