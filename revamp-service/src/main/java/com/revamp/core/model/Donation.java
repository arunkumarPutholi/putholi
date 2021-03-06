package com.revamp.core.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "donation")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Donation extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = -1748436992625970292L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donation_id", nullable = false)
	private long donationId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id")
	private Project project;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "donor_id")
	private User donor;

	@Column(name = "payment_mode")
	private String paymentMode;

	@Column(name = "amount")
	private int amount;

	@Column(name = "payment_status")
	private String paymentStatus = "PENDING";

	@Column(name = "createdate")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;

	@Column(name = "tracking_id")
	private String tracking_id;
	
}
