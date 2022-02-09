package com.vp.booking.port

import scala.concurrent.Future
import com.vp.booking.domain.User

trait UserRepo [A <: User] {
    def save(entity: A): Future[A]
    def remove(id: String): Future[Option[A]]
    def find(id: String): Future[Option[A]]
    def findAll(): Future[Seq[A]]
} 