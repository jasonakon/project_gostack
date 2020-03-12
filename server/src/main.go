package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Person struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var persons []Person

func main() {
	r := mux.NewRouter()

	// dummy data
	persons = append(persons, Person{ID: "1", Name: "Nicholas"})

	r.HandleFunc("/api/persons", getPersons).Methods("GET")
	r.HandleFunc("/api/addpersons", addPerson).Methods("PUT")
	r.HandleFunc("/api/deletepersons", deletePerson).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getPersons(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(persons)
}

func addPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)
	person.ID = strconv.Itoa(rand.Intn(100000000)) // Mock ID - not safe
	persons = append(persons, person)
	json.NewEncoder(w).Encode(persons)
}

func deletePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)

	for i := 0; i < len(persons); i++ {
		if persons[i].Name == person.Name {
			persons = append(persons[:i], persons[(i+1):]...)
		}
	}

	json.NewEncoder(w).Encode(persons)
}
