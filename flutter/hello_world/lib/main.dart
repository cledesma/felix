import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() {
  runApp(MainApp());
}

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Startup Name Generator',
        theme: ThemeData(primaryColor: Colors.white),
        home: RandomWords());
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  final suggestions = <WordPair>[];
  final biggerFont = TextStyle(fontSize: 18.0);
  final saved = Set<WordPair>();

  void pushSaved() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) {
        final tiles = saved.map((pair) {
          return ListTile(
            title: Text(pair.asPascalCase, style: biggerFont),
          );
        });
        final divided = ListTile
            .divideTiles(
              context: context,
              tiles: tiles,
            )
            .toList();
        return Scaffold(
          appBar: AppBar(
            title: Text('Saved Suggestions'),
          ),
          body: ListView(children: divided),
        );
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Startup Name Generator'), actions: <Widget>[
          IconButton(icon: Icon(Icons.list), onPressed: pushSaved)
        ]),
        body: buildSuggestions());
  }

  Widget buildSuggestions() {
    return ListView.builder(
        padding: EdgeInsets.all(16.0),
        itemBuilder: (context, i) {
          if (i.isOdd) return Divider();
          final index = i ~/ 2;
          if (index >= suggestions.length) {
            suggestions.addAll(generateWordPairs().take(10));
          }
          return buildRow(suggestions[index]);
        });
  }

  Widget buildRow(WordPair pair) {
    final alreadySaved = saved.contains(pair);
    return ListTile(
        title: Text(
          pair.asPascalCase,
          style: biggerFont,
        ),
        trailing: Icon(alreadySaved ? Icons.favorite : Icons.favorite_border,
            color: alreadySaved ? Colors.red : null),
        onTap: () {
          setState(() {
            if (alreadySaved) {
              saved.remove(pair);
            } else {
              saved.add(pair);
            }
          });
        });
  }
}
