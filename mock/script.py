import json

with open('./db/users.json', 'r+') as file:
    data = json.load(file)
    users = data['results']
    for i, user in enumerate(users):
        users[i]['name']['fullname'] = user['name']['first'] + ' ' + user['name']['last']
        users[i]['username'] = user['name']['first'].lower() + user['name']['last'].lower()
        users[i]['password'] = user['name']['first'].lower() + user['name']['last'].lower()
        
    data['result'] = users
    file.seek(0)
    json.dump(data, file)