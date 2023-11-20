# Funktion zum Einlesen der Liste aus der Datei
def lese_liste_aus_datei(dateipfad):
    try:
        with open(dateipfad, 'r') as datei:
            liste = datei.read().splitlines()
        return liste
    except FileNotFoundError:
        print(f'Die Datei "{dateipfad}" wurde nicht gefunden.')
        return []

# Funktion zum Schreiben der Liste in die Datei ohne Duplikate
def schreibe_liste_in_datei(dateipfad, liste):
    with open(dateipfad, 'w') as datei:
        for element in liste:
            datei.write(element + '\n')

if __name__ == "__main__":
    dateipfad = 'words.txt'  # Passe dies entsprechend deinem Dateinamen an

    # Liste aus der Datei einlesen
    original_liste = lese_liste_aus_datei(dateipfad)
    # Duplikate entfernen
    bereinigte_liste = list(set(original_liste))

    # Liste ohne Duplikate zurück in die Datei schreiben
    schreibe_liste_in_datei(dateipfad, bereinigte_liste)