class Service {
    constructor(knex) {
      this.knex = knex
    }
  
    list(search) {
  
      console.log("search",search);
      let query = this.knex
        .select("links.id", "links.name", "links.url",
        )
        .from("links")
        .where("links.name", "like", `%${search}%`)
        
      console.log("this is Link service");
      var linkArray = []
      return query.then(async (rows) => {
        let prevlink
        let array
        for (let i = 0; i < rows.length; i++) {
            console.log("rowsssss",rows);
          if (prevlink == undefined || prevlink != rows[i].id) {
            var tagQuery = await this.knex
              .select("tags.name")
              .from("tags")
              .innerJoin("links_tags", "tags.id", "tags_id")
              .where("links_tags.links_id", `${rows[i].id}`)
              .then((rows) => {
                return rows
              })
  
            array = {
              id: rows[i].id,
              name: rows[i].name,
              url: rows[i].url,
              tags: tagQuery
            }
            linkArray.push(array)
            prevlink = rows[i].id
          }
  
        }
        console.log("linkArray",linkArray);
        return linkArray
      })
  
  
    }
  
    async add(link) {
      console.log(link);
      let query = await this.knex.insert({
        name: link.name,
        url: link.url,
      })
        .into("links")
        .returning("id")
  
      link.tags.map(async (tag) => {
        let query1 = await this.knex
          .select("*")
          .from("tags")
          .where("name", "=", tag.name)
          .then(async (data) => {
            console.log("data, tag.name", data, tag.name);
            return data
          })
  
        if (query1[0] === undefined) {
          await this.knex
            .insert({
              name: tag.name,
            })
            .into("tags")
            .returning("id")
            .then(async (data) => {
              console.log("data", data);
              await this.knex.
                insert({
                  links_id: query[0],
                  tags_id: data[0]
                })
                .into("links_tags")
                .returning("id")
            })
        } else {
          await this.knex.insert({
            links_id: query[0],
            tags_id: query1[0].id
          })
            .into("links_tags")
            .returning("id")
        }
      })
  
  
    }
  
    remove(id) {
      console.log("id", id);
      let query = this.knex
        .select("*")
        .from("links")
        .innerJoin("links_tags", "links.id", "links_id")
        .where("links.id", id)
        .andWhere('links_tags.links_id', id)
  
      return query.then((rows) => {
        console.log("delete.rows", rows);
        return this.knex("links_tags")
        .where('links_tags.links_id', id)
        .del()
        .then(()=>{
          return this.knex("links")
          .where("links.id", id)
          .del()
        })
       
  
      });
    }
  }
  module.exports = Service;