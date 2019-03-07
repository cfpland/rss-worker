const filenameToCategoryMap = {
  'android.json': 'Mobile',
  'clojure.json': 'General',
  'cpp.json': 'General',
  'css.json': 'CSS',
  'data.json': 'Data',
  'devops.json': 'DevOps',
  'dotnet.json': '.NET',
  'elixir.json': 'General',
  'general.json': 'General',
  'golang.json': 'Go',
  'graphql.json': 'Data',
  'ios.json': 'Mobile',
  'java.json': 'Java',
  'javascript.json': 'Javascript',
  'networking.json': 'General',
  'php.json': 'PHP',
  'python.json': 'Python',
  'ruby.json': 'Ruby',
  'rust.json': 'General',
  'scala.json': 'Java',
  'security.json': 'Security',
  'tech-comm.json': 'General',
  'ux.json': 'Design',
};

const filenameToCategory = (conference) => {
  const category = (conference.filename && filenameToCategoryMap[conference.filename]) ?
    filenameToCategoryMap[conference.filename] :
    'General';

  return {
    ...conference,
    category,
  };
}

module.exports = conferences => conferences.map(filenameToCategory);
