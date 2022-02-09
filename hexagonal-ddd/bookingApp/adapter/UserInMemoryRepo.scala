
package com.vp.booking.adapter


import scala.collection.concurrent
import scala.concurrent.Future
import com.vp.booking.port.UserRepo
import com.vp.booking.businessLogic.User



class UserInMemoryRepo extends UserRepo

object UserInMemoryRepo {

  def apply(): UserInMemoryRepository = {

    protected val store: concurrent.Map[String, User] = new concurrent.TrieMap[String, User]()

    override def save(user: User): Future[User] = Future.successful {
        store += (user.id -> user)
        user
    }

    override def remove(id: String): Future[Option[User]] = Future.successful {
        store.remove(id)
    }

    override def find(id: String): Future[Option[User]] = Future.successful {
        store.get(id)
    }

    override def findAll(): Future[Seq[User]] = Future.successful {
        store.toSeq.map {
            case (_, value) => value
        }
    }

  }

}